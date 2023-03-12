import IconButton from '@mui/material/IconButton';
export interface IStateIconButton {
  passedState:string;
  buttonState: string;
  updateState: (arg: string) => void;
  icon?: React.ReactNode;
}

const StateIconButton: React.FC<IStateIconButton> = ({ buttonState,updateState,icon }) => {

  return (
    <div className="rounded-lg transition ease-in-out bg-blue-700 hover:-translate-y-1 hover:scale-110 hover:bg-blue-500 duration-200">
      <IconButton onClick={() => updateState(buttonState)} aria-label="add to shopping cart"  >
      {icon}
      </IconButton>
    </div>
  );
};

export default StateIconButton;
