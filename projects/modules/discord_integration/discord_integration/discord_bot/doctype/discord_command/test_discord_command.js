import { DiscordCommand } from './discord_command';
import { expect } from 'jest';

describe('Discord Command Tests', () => {
  it('should refresh the form correctly', () => {
    const discordCommand = new DiscordCommand();
    const mockForm = { refresh: jest.fn() };

    discordCommand.refresh(mockForm);

    expect(mockForm.refresh).toHaveBeenCalled();
  });

  // Add more tests here for other functions in the discord_command.js file
});
