import { Dialog, DialogContent } from "@/components/ui/dialog";

const DialogWrapper = (
  OldComponent: React.FC,
  openValue: boolean,
  onChangeCb: () => void
) => {
  const EnhancedDialog: React.FC = (props = {}) => {
    return (
      <Dialog open={openValue} onOpenChange={onChangeCb}>
        <DialogContent className="w-max rounded-xl p-2">
          <OldComponent {...props} />
        </DialogContent>
      </Dialog>
    );
  };

  return EnhancedDialog;
};

export default DialogWrapper;
