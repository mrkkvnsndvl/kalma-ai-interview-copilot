interface InterviewFormValues {
  jobTitle: string;
  jobDescription: string | undefined;
  companyName: string | undefined;
  resume: File | undefined;
  openRouterAPIKey: string;
  apiModel: string;
  deepgramAPIKey: string;
}

interface openRouterAPIModelsI {
  modelName: string;
  id: string;
}
