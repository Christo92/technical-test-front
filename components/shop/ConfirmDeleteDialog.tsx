import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface ConfirmDeleteDialogProps {
  /** Controls whether the dialog is open or closed */
  open: boolean;
  /** Callback function to close the dialog (e.g., clicking "Cancel") */
  onClose: () => void;
  /** Callback function to confirm the deletion action (e.g., clicking "Delete All") */
  onConfirm: () => void;
}

/**
 * ConfirmDeleteDialog component
 *
 * A modal dialog used to confirm the deletion of all items in the cart.
 *
 * Props:
 * - open: Boolean that determines if the dialog is displayed.
 * - onClose: Function called to close the dialog without deleting items.
 * - onConfirm: Function called to confirm deletion of all items.
 *
 * The dialog displays a warning message that the action is irreversible,
 * and provides two buttons: Cancel and Delete All.
 */
const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Supprimer tous les articles</DialogTitle>
      <DialogContent>
        <Typography>
        Êtes-vous sûr de vouloir supprimer tous les articles de votre panier ?
        Cette action est irréversible.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button color="error" onClick={onConfirm}>
          Delete All
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
