import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { openRouterAPIModels } from "@/constants";
import { useForm } from "@tanstack/react-form";

const PopupForm = () => {
  const form = useForm({
    defaultValues: {
      jobTitle: "",
      jobDescription: undefined,
      companyName: undefined,
      resume: undefined,
      openRouterAPIKey: "",
      apiModel: "",
      deepgramAPIKey: "",
    } as InterviewFormValues,
    onSubmit: ({ value }) => {
      alert(JSON.stringify(value, null, 2));
    },
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="flex flex-col p-4 gap-y-4">
          <h3 className="text-base font-medium">Setup Interview Context</h3>
          <form.Field
            name="jobTitle"
            validators={{
              onChange: ({ value }) => {
                return value.trim() === ""
                  ? "Job title is required"
                  : undefined;
              },
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="jobTitle">Job Title (Required)</Label>
                <Input
                  className="placeholder:text-sm"
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  placeholder="Enter job title"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors ? (
                  <em className="text-red-500" role="alert">
                    {field.state.meta.errors.join(", ")}
                  </em>
                ) : null}
              </div>
            )}
          </form.Field>
          <form.Field name="jobDescription">
            {(field) => (
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="jobDescription">
                  Job Description (Optional)
                </Label>
                <Textarea
                  className="placeholder:text-sm"
                  id="jobDescription"
                  name="jobDescription"
                  placeholder="Enter job description"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>
          <form.Field name="companyName">
            {(field) => (
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="companyName">Company Name (Optional)</Label>
                <Input
                  className="placeholder:text-sm"
                  type="text"
                  id="companyName"
                  name="companyName"
                  placeholder="Enter company name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>
          <form.Field name="resume">
            {(field) => (
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="resume">Resumé (Optional)</Label>
                <Input
                  className="cursor-pointer placeholder:text-sm"
                  type="file"
                  id="resume"
                  name="resume"
                  accept="application/pdf"
                  onChange={(e) => field.handleChange(e.target.files?.[0])}
                />
              </div>
            )}
          </form.Field>
        </div>
        <Separator />
        <div className="flex flex-col p-4 gap-y-4">
          <h3 className="text-base font-medium">API Configuration</h3>
          <form.Field
            name="openRouterAPIKey"
            validators={{
              onChange: ({ value }) => {
                return value.trim() === "" ? "API key is required" : undefined;
              },
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="openRouterAPIKey">
                  OpenRouter API Key (Required)
                </Label>
                <Input
                  className="placeholder:text-sm"
                  type="password"
                  id="openRouterAPIKey"
                  name="openRouterAPIKey"
                  placeholder="Enter API key"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors ? (
                  <em className="text-red-500" role="alert">
                    {field.state.meta.errors.join(", ")}
                  </em>
                ) : null}
                <div>
                  <h4 className="text-sm">How to get an OpenRouter API key?</h4>
                  <ul>
                    <ol className="text-xs">
                      1. Sign up for an account at the&nbsp;
                      <a
                        className="font-medium underline"
                        href="https://openrouter.ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        OpenRouter
                      </a>
                      &nbsp;website
                    </ol>
                    <ol className="text-xs">
                      2. Navigate to the API keys section in your account
                      dashboard and create an API key
                    </ol>
                    <ol className="text-xs">
                      3. Copy and paste the key into the field above
                    </ol>
                  </ul>
                </div>
              </div>
            )}
          </form.Field>
          <form.Field
            name="apiModel"
            validators={{
              onChange: ({ value }) => {
                return value.trim() === ""
                  ? "API model is required"
                  : undefined;
              },
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="apiModel">
                  OpenRouter API Model (Required)
                </Label>
                <Select
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue placeholder="Select API model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Models</SelectLabel>
                      {openRouterAPIModels.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          {model.modelName}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {field.state.meta.errors ? (
                  <em className="text-red-500" role="alert">
                    {field.state.meta.errors.join(", ")}
                  </em>
                ) : null}
              </div>
            )}
          </form.Field>
          <form.Field
            name="deepgramAPIKey"
            validators={{
              onChange: ({ value }) => {
                return value.trim() === "" ? "API key is required" : undefined;
              },
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="deepgramAPIKey">
                  Deepgram API Key (Required)
                </Label>
                <Input
                  className="placeholder:text-sm"
                  type="password"
                  id="deepgramAPIKey"
                  name="deepgramAPIKey"
                  placeholder="Enter API key"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors ? (
                  <em className="text-red-500" role="alert">
                    {field.state.meta.errors.join(", ")}
                  </em>
                ) : null}
                <div>
                  <h4 className="text-sm">How to get a Deepgram API key?</h4>
                  <ul>
                    <ol className="text-xs">
                      1. Sign up for an account at the&nbsp;
                      <a
                        className="font-medium underline"
                        href="https://deepgram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Deepgram
                      </a>
                      &nbsp;website
                    </ol>
                    <ol className="text-xs">
                      2. Navigate to the API keys section in your account
                      dashboard and create an API key
                    </ol>
                    <ol className="text-xs">
                      3. Copy and paste the key into the field above
                    </ol>
                  </ul>
                </div>
              </div>
            )}
          </form.Field>
        </div>
        <Separator />
        <div className="p-4">
          <Button
            type="submit"
            className="w-full cursor-pointer"
            variant="default"
          >
            Open AI Interview Copilot
          </Button>
        </div>
      </form>
    </>
  );
};

export default PopupForm;
