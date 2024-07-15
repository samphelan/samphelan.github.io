import { MutableRefObject, useEffect, useRef, useState } from "react";
import styles from "./locationInputStyles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent } from "react";

type LabelProps = {
  children?: React.ReactNode;
  htmlFor?: string;
};
const FormLabel = (props: LabelProps) => {
  return (
    <label
      htmlFor={props.htmlFor}
      className={[styles.label, "appleFont"].join(" ")}
    >
      {props.children}
    </label>
  );
};

type InputProps = {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  style?: React.CSSProperties;
  id?: string;
  disabled?: boolean;
  placeholder?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: boolean;
  readonly?: boolean;
  type?:
    | "button"
    | "checkbox"
    | "text"
    | "password"
    | "submit"
    | "email"
    | "number";
  autoComplete?: string;
  className?: string;
};

const Input = (props: InputProps) => {
  return (
    <input
      autoComplete={props.autoComplete}
      id={props.id}
      value={props.value}
      type={props.type || "text"}
      className={[
        styles.input,
        props.error && styles.error,
        props.className || null,
      ].join(" ")}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        if (!props.readonly) props.onChange(e.currentTarget.value);
      }}
      disabled={props.disabled}
      placeholder={props.placeholder}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      readOnly={props.readonly}
      style={props.style}
    ></input>
  );
};

type AutoCompleteSuggestion = {
  placePrediction: {
    place: string;
    placeId: string;
    text: {
      text: string;
      matches: [
        {
          endOffset: number;
        }
      ];
    };
    structuredFormat: {
      mainText: {
        text: string;
        matches: [
          {
            endOffset: 6;
          }
        ];
      };
      secondaryText?: {
        text: string;
      };
    };
    types: string[];
  };
};

type AddressComponent = {
  longText: string;
  shortText: string;
  types: string[];
  languageCode: string;
};

type LatLng = {
  latitude: number;
  longitude: number;
};

export type StudioLocation = {
  location: LatLng;
  text: {
    mainText: string;
    secondaryText?: string;
  };
  googleId: string;
  types: string[];
  formattedAddress: string;
  shortFormattedAddress: string;
  addressComponents: AddressComponent[];
  utcOffsetMinutes: number;
  viewport: { low: LatLng; high: LatLng };
  googleMapsUri: string;
  locality?: string;
  postalCode?: number;
  postalCodeSuffix?: number;
  administrativeAreaLevel1?: AddressComponent;
  country?: AddressComponent;
};

type PlaceDetails = {
  name: string;
  id: string;
  types: string[];
  formattedAddress: string;
  addressComponents: AddressComponent[];
  location: LatLng;
  viewport: { low: LatLng; high: LatLng };
  googleMapsUri: string;
  utcOffsetMinutes: number;
  displayName: { text: string; languageCode?: string };
  shortFormattedAddress: string;
};

const fetchAutocompleteSuggestions = async (
  input: string,
  types?: string[]
) => {
  const response = await fetch(
    "https://places.googleapis.com/v1/places:autocomplete",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY!,
      },
      body: JSON.stringify(
        types
          ? { input, includedPrimaryTypes: types }
          : {
              input,
            }
      ),
    }
  );
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const json = await response.json();
  return json.suggestions;
};

const fetchPlaceDetails = async (id: string) => {
  const response = await fetch(
    `https://places.googleapis.com/v1/places/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY!,
        "X-Goog-FieldMask":
          "name,id,types,formattedAddress,addressComponents,location,viewport,googleMapsUri,utcOffsetMinutes,displayName,shortFormattedAddress",
      },
    }
  );
  const json = await response.json();
  return json;
};

const useClickOutside = (
  ref: MutableRefObject<HTMLElement | null>,
  onClickOutside: () => void
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      event.stopPropagation();
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, [ref, onClickOutside]);
};

type NewLocationInputProps = {
  onSelect: (place: StudioLocation | undefined) => void;
  value?: StudioLocation;
  types?: string[];
  placeholder?: string;
  label?: string;
};

const LocationInput = (props: NewLocationInputProps) => {
  const [suggestions, setSuggestions] = useState<AutoCompleteSuggestion[]>();
  const [location, setLocation] = useState<AutoCompleteSuggestion>();
  const [placeDetails, setPlaceDetails] = useState<PlaceDetails>();
  const [placeDetailError, setPlaceDetailError] = useState<Error | null>(null);
  const [autoCompleteError, setAutoCompleteError] = useState<Error | null>(
    null
  );
  const [value, setValue] = useState("");

  const suggestionsRef = useRef(null);

  useClickOutside(suggestionsRef, () => {
    setSuggestions(undefined);
  });

  const getAndSetSuggestions = (v: string) => {
    fetchAutocompleteSuggestions(v, props.types)
      .then((results) => {
        setSuggestions(results);
      })
      .catch((err: Error) => setAutoCompleteError(err));
  };

  const handleInput = (v: string) => {
    setValue(v);
    // If the input value is not an empty string, fetch Google AutoComplete suggestions
    if (v) {
      getAndSetSuggestions(v);
    }
  };

  const handleFocus = () => {
    if (value && !suggestions) {
      getAndSetSuggestions(value);
    }
  };

  const handleSelect = (s: AutoCompleteSuggestion) => {
    setSuggestions(undefined);
    setValue(
      `${s.placePrediction.structuredFormat.mainText.text} ${s.placePrediction.structuredFormat.secondaryText?.text}`
    );
    setLocation(s);
    fetchPlaceDetails(s.placePrediction.placeId)
      .then((d) => {
        setPlaceDetails(d);
      })
      .catch((err: Error) => {
        setPlaceDetailError(err);
      });
  };

  useEffect(() => {
    if (placeDetails) {
      const localityComponent = placeDetails.addressComponents.find((c) =>
        c.types.includes("locality")
      );
      const postalCodeComponent = placeDetails.addressComponents.find((c) =>
        c.types.includes("postal_code")
      );
      const postalCodeSuffixComponent = placeDetails.addressComponents.find(
        (c) => c.types.includes("postal_code_suffix")
      );
      const administrativeAreaLevel1Component =
        placeDetails.addressComponents.find((c) =>
          c.types.includes("administrative_area_level_1")
        );
      const countryComponent = placeDetails.addressComponents.find((c) =>
        c.types.includes("country")
      );

      // Structure the data into StudioLocation format
      const structuredData = {
        location: placeDetails?.location,
        text: {
          mainText: location?.placePrediction.structuredFormat.mainText.text,
          secondaryText:
            location?.placePrediction.structuredFormat.secondaryText?.text,
        },
        googleId: placeDetails.id,
        types: placeDetails.types,
        formattedAddress: placeDetails.formattedAddress,
        shortFormattedAddress: placeDetails.shortFormattedAddress,
        addressComponents: placeDetails.addressComponents,
        utcOffsetMinutes: placeDetails.utcOffsetMinutes,
        viewport: {
          low: placeDetails.viewport.low,
          high: placeDetails.viewport.high,
        },
        googleMapsUri: placeDetails.googleMapsUri,
        // Only insert optional properties into the object if they are defined, thereby preventing errors when inserting the object into the datastore
        ...(localityComponent?.longText && {
          locality: localityComponent.longText,
        }),
        ...(postalCodeComponent && {
          postalCode: parseInt(postalCodeComponent.longText),
        }),
        ...(postalCodeSuffixComponent && {
          postalCodeSuffix: parseInt(postalCodeSuffixComponent.longText),
        }),
        ...(administrativeAreaLevel1Component && {
          administrativeAreaLevel1: administrativeAreaLevel1Component,
        }),
        ...(countryComponent && { country: countryComponent }),
      } as StudioLocation;
      props.onSelect(structuredData);
    }
  }, [placeDetails]);

  return (
    <div className={styles.wrapper}>
      {props.label ? (
        <FormLabel htmlFor="location">{props.label}</FormLabel>
      ) : null}
      <div ref={suggestionsRef}>
        <div className={styles.inputWrapper}>
          <Input
            autoComplete="off"
            id="location"
            // If the component is being controlled, display the value from props and disable typing.
            value={
              props.value
                ? `${props.value.text.mainText} ${props.value.text.secondaryText}`
                : value
            }
            onFocus={handleFocus}
            onChange={handleInput}
            disabled={typeof props.value !== "undefined"}
            placeholder={
              props.placeholder || "Enter Address, City, or Zip Code"
            }
            readonly={typeof location !== "undefined"}
          />
          <button
            className={[
              styles.xWrapper,
              !props.value ? styles.hidden : null,
            ].join(" ")}
            onClick={() => {
              setValue("");
              props.onSelect(undefined);
              setLocation(undefined);
            }}
          >
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
          </button>
        </div>
        {suggestions && (
          <ul className={[styles.suggestionList, "appleFont"].join(" ")}>
            {suggestions.map((s) => (
              <li
                key={s.placePrediction.placeId}
                onClick={() => {
                  handleSelect(s);
                }}
                className={styles.suggestion}
              >
                <strong>
                  {s.placePrediction.structuredFormat.mainText.text}
                </strong>{" "}
                <small>
                  {s.placePrediction.structuredFormat.secondaryText?.text}
                </small>
              </li>
            ))}
          </ul>
        )}
        {placeDetailError && (
          <div className={styles.errorMessage}>
            There was an error retrieving details about this location. Try again
            later or try a different location.
          </div>
        )}
        {autoCompleteError && (
          <div className={styles.errorMessage}>
            There was an error retrieving place suggestions. Please try again
            later.
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationInput;
