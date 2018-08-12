import { getCommand } from '../../../src/main/tasks/commands';

describe('Commands Tests', () => {
  test('should return the command for EXEC_LS', () => {
    expect(getCommand('EXEC_LS')).toStrictEqual('ls');
  });
});
