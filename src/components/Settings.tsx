
const defaultConfigData: IConfigData = {
  apiBaseUrl: "",
  model: "",
  apiToken: "",
  systemPrompt: "",
};

export interface IConfigData {
  apiBaseUrl: string;
  model: string;
  apiToken: string;
  systemPrompt: string;
}

export interface ISettingsProps {
  initialData?: IConfigData;
  setConfigData: (data: IConfigData) => void;
}

function Settings({initialData, setConfigData}: ISettingsProps) {
  return (
    <></>
  );
}
export default Settings;
