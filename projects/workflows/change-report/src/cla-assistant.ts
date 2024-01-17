import { CLAApiClient } from 'cla-assistant-api-client';

export async function checkCLA(pullRequestNumber: number, committers: string[]): Promise<boolean> {
  const apiClient = new CLAApiClient();
  
  try {
    const signatures = await apiClient.getSignatures(pullRequestNumber, branchName);
    
    for (const committer of committers) {
      if (!signatures.includes(committer)) {
        return false;
      }
    }
    
    return true;
  } catch (error) {
    throw new Error('Error occurred when checking CLA: ' + error.message);
  }
}
