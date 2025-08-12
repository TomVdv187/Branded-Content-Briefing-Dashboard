export interface BriefingData {
  publisherName: string;
  publisherType: string;
  currentChallenges: string;
  targetAudience: string;
  contentTypes: string[];
  monetizationMethods: string[];
  currentTools: string;
  desiredOutcomes: string;
  timeframe: string;
  budget: string;
  additionalRequirements: string;
}

export interface BlueprintSection {
  title: string;
  content: string;
}

export interface GeneratedBlueprint {
  executiveSummary: string;
  coreFunctionalities: string;
  technicalArchitecture: string;
  userJourney: string;
  revenueImpact: string;
  implementationRoadmap: string;
  riskMitigation: string;
}