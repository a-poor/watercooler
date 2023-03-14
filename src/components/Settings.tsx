import { Box, Title, TextInput, PasswordInput, Button, Group, ScrollArea } from '@mantine/core';
import { useForm } from '@mantine/form';


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
  const form = useForm({
    initialValues: initialData || {
      apiBaseUrl: "",
      model: "",
      apiToken: "",
      systemPrompt: "",
    },
  });
  return (
    <ScrollArea h="100%">
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "20px",
          marginBottom: "20px",
          maxWidth: "420px", 
          minHeight: "450px",
        }}
      >
        <Title order={2}>Settings</Title>
        <form onSubmit={form.onSubmit((values) => setConfigData(values))}>
          <TextInput 
            label="API Base URL"
            description='OpenAI API base URL. The endpoint "/v1/chat/completions" will be used.'
            placeholder="https://api.openai.com"
            {...form.getInputProps('apiBaseUrl')}
            mb="sm"
          />
          <TextInput 
            label="Model"
            description='The model to use for chat completion (e.g. "gpt-3.5-turbo", "gpt-3.5-turbo-0301").'
            placeholder="gpt-3.5-turbo"
            {...form.getInputProps('model')}
            mb="sm"
          />
          <PasswordInput 
            label="API Token"
            description={(
              <span>
                OpenAI API auth token - used as a Bearer token.
                Read more <a href="https://platform.openai.com/docs/api-reference/authentication">here</a>
              </span>
            )}
            placeholder="Token"
            {...form.getInputProps('apiToken')}
            mb="sm"
          />
          <TextInput 
            label="System Prompt"
            description={(
              <span>
                The seed prompt for the chat. Read more <a href="https://platform.openai.com/docs/guides/chat/introduction">here</a>
              </span>
            )}
            placeholder="Chat model system prompt"
            {...form.getInputProps('systemPrompt')}
            mb="sm"
          />
          <Group position="right" mt="md">
            <Button variant="outline" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button type="submit">
              Update
            </Button>
          </Group>
        </form>
      </div>
    </ScrollArea>
  );
}
export default Settings;
