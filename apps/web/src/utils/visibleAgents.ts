import type { AgentInfo } from '../types';

// fork(local-only): 'amr' stays hidden — the Open Design Cloud agent must not
// appear in agent pickers, the model switcher, or Settings.
const HIDDEN_LOCAL_CLI_AGENT_IDS = new Set(['amr', 'byok-opencode']);

export function isVisibleLocalCliAgent(agent: Pick<AgentInfo, 'id'>): boolean {
  return !HIDDEN_LOCAL_CLI_AGENT_IDS.has(agent.id);
}

export function deepSeekHarnessNeedsSetup(agent: AgentInfo): boolean {
  return (
    agent.id === 'deepseek-harness' &&
    !agent.available &&
    Boolean(agent.path) &&
    Boolean(
      agent.diagnostics?.some(
        (diagnostic) => diagnostic.reason === 'runtime-profile-incompatible',
      ),
    )
  );
}
