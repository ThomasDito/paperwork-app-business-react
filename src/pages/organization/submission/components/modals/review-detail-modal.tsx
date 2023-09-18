import { Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "paperwork-ui";

type Props = {
  text: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export default function ReviewDetailModal({ text, isOpen, setIsOpen }: Props): JSX.Element {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail Keterangan</DialogTitle>
          <div className="pt-5">
            <Textarea className="max-h-96" rows={15} readOnly value={text} defaultValue={""} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
