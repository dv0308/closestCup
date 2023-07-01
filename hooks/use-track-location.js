import { useContext, useState } from "react";
import { ACTION_TYPES, StoreContext } from "../pages/_app";

const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  const [latt, setLatt] = useState("");
  //   const [lng, setLng] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const { dispatch } = useContext(StoreContext);
  //console.log("hi");
  //console.log({latt})

  function success(position) {
    console.log({ position });
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log({ latitude });

    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: {
        lat: { latitude },
        lng: { longitude },
      },
    });
    //setLatt(latitude);
    // setLng(longitude);
    setLocationErrorMsg("");
    setIsFindingLocation(false);
  }

  const error = () => {
    //console.log("hhhihihi");
    setIsFindingLocation(false);
    setLocationErrorMsg("Unable to retrieve your location");
  };

  const handleTrackLocation = () => {
    //console.log("hiii");
    setIsFindingLocation(true);
    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not supported by your browser");
    } else {
      //console.log("hiiii");
      // status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
    console.log({ latt });
  };

  return {
    // lat,
    // lng,
    handleTrackLocation,
    locationErrorMsg,
    isFindingLocation,
  };
};

export default useTrackLocation;
