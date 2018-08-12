import { get as _get } from 'lodash';
import { EXEC_LS } from '../../common/constants/commandTypes';

export interface ICommands {
  [key: string]: string;
}

const commands: ICommands = {
  [EXEC_LS]: 'ls',
};

export const getCommand = (commandKey: string): string => _get(commands, commandKey);
