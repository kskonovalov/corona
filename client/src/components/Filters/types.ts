import { baseCSSEGISandDataTypes } from "../../config";

type TFilters = {
    type: baseCSSEGISandDataTypes | string;
    setType: (value: baseCSSEGISandDataTypes | string) => void;
    provinces: string[];
    province: string;
    setProvince: (value: string) => void;
    country: string;
    setCountry: (value: string) => void;
    countries: string[];
    displayForDays: number;
    setDisplayForDays: (value: number) => void;
    dynamic: boolean;
    setDynamic: (value: boolean) => void;
};

export default TFilters;
