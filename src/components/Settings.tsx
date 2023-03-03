
export interface IConfigData {
  apiHost: string;
  model: "gpt-3.5-turbo" | "gpt-3.5-turbo-0301" | string;
  apiToken: string;
  systemPrompt: string;
}

export interface ISettingsProps {
  initialData: IConfigData;
  setConfigData: (data: IConfigData) => void;
}

function Settings({initialData, setConfigData}: ISettingsProps) {
  return (
    <></>
  );
}
export default Settings;
