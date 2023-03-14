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
    <ScrollArea>
      <Box mx="auto" mt={20} sx={{maxWidth: "420px"}}>
        <Title order={2}>Settings</Title>
        <form onSubmit={form.onSubmit((values) => setConfigData(values))}>
          <TextInput 
            label="API Base URL"
            description='OpenAI API base URL. The endpoint "/v1/chat/completions" will be used.'
            placeholder="https://..."
            {...form.getInputProps('apiBaseUrl')}
            mb="sm"
          />
          <TextInput 
            label="Model"
            description='The model to use for chat completion (e.g. "gpt-3.5-turbo", "gpt-3.5-turbo-0301").'
            placeholder="https://..."
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
            placeholder="https://..."
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
            placeholder="https://..."
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
      </Box>
    </ScrollArea>
  );
}
export default Settings;