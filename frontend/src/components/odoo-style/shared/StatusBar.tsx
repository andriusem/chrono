// ============================================
// STATUS BAR COMPONENT
// ============================================
// Visual workflow stages following Odoo's statusbar pattern
// Shows progression through states with clickable stages

interface StatusBarProps {
  stages: {
    id: string;
    label: string;
  }[];
  currentStage: string;
  completedStages?: string[];
  onStageClick?: (stageId: string) => void;
  clickable?: boolean;
}

export function StatusBar({
  stages,
  currentStage,
  completedStages = [],
  onStageClick,
  clickable = true,
}: StatusBarProps) {
  const currentIndex = stages.findIndex((s) => s.id === currentStage);

  return (
    <div className="odoo-statusbar">
      {stages.map((stage, index) => {
        const isCurrent = stage.id === currentStage;
        const isCompleted = completedStages.includes(stage.id) || index < currentIndex;

        let className = 'odoo-statusbar-item';
        if (isCurrent) className += ' active';
        else if (isCompleted) className += ' completed';

        return (
          <button
            key={stage.id}
            onClick={() => clickable && onStageClick?.(stage.id)}
            className={className}
            disabled={!clickable}
          >
            {stage.label}
          </button>
        );
      })}
    </div>
  );
}

// ============================================
// TIMER STATUS BAR
// ============================================
// Specialized status bar for time entry states

export type TimerStatus = 'not_started' | 'running' | 'paused' | 'completed' | 'interrupted';

interface TimerStatusBarProps {
  status: TimerStatus;
  onStatusChange?: (status: TimerStatus) => void;
  clickable?: boolean;
}

export function TimerStatusBar({
  status,
  onStatusChange,
  clickable = false,
}: TimerStatusBarProps) {
  const stages = [
    { id: 'not_started', label: 'Not Started' },
    { id: 'running', label: 'Running' },
    { id: 'paused', label: 'Paused' },
    { id: 'completed', label: 'Completed' },
  ];

  // Map interrupted to a visible state
  const displayStatus = status === 'interrupted' ? 'paused' : status;

  return (
    <StatusBar
      stages={stages}
      currentStage={displayStatus}
      onStageClick={(stageId) => onStatusChange?.(stageId as TimerStatus)}
      clickable={clickable}
    />
  );
}
