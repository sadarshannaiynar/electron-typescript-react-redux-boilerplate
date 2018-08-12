import { exec as process, ExecException } from 'child_process';
import { IpcMessageEvent } from 'electron';

interface ICommandOutput {
  error: ExecException;
  output: string;
  errorLog: string;
}

const executionCallback = (event: IpcMessageEvent, commandKey: string, outputObj: ICommandOutput): void => {
  if (outputObj.error) {
    event.sender.send(`error-${commandKey}`, {
      log: outputObj.errorLog,
    });
  } else {
    event.sender.send(`success-${commandKey}`, {
      log: outputObj.output,
    });
  }
};

export const executeCommand = (command: string, event: IpcMessageEvent, commandKey: string): void => {
  process(command, (error, stdout, stderr) => {
    const outputObj: ICommandOutput = {
      error,
      errorLog: stderr,
      output: stdout,
    };
    executionCallback(event, commandKey, outputObj);
  });
};
