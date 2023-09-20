import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { PenBoxIcon } from "lucide-react";
import { Pen } from "lucide-react";
const Modal = ({ id, title }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pen size={15} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Cantidad de accesos
            </Label>
            <Input id="name" type="number" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Editar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
