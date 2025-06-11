export interface TerminalLine {
  id: string;
  text: string;
  type: 'system' | 'user' | 'result' | 'warning' | 'error' | 'success';
  timestamp: Date;
  delay?: number;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'warning';
  disabled?: boolean;
  className?: string;
}

export interface ProgressBarProps {
  value: number;
  max: number;
  label: string;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
}

export interface CardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'locked' | 'discovered' | 'active';
}

export interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

export interface GlitchTextProps {
  text: string;
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

