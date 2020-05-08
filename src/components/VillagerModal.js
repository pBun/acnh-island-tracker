import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import VilagerCombobox from "./VillagerCombobox";

export default function FormModal({ children, open, handleConfirm, handleCancel }) {
    const [selectedVillager, setSelectedVillager] = React.useState(null);
    return (
        <Dialog
            open={open}
            onClose={handleCancel}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Track a Villager</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Select a villager to track (hopefully it's Raymond).
                </DialogContentText>
                <VilagerCombobox
                    value={selectedVillager}
                    onChange={(e, newVal) => setSelectedVillager(newVal)}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        handleCancel();
                        setSelectedVillager(null);
                    }}
                    color="primary"
                >
                    Cancel
                </Button>
                <Button
                    disabled={!selectedVillager}
                    onClick={() => {
                        handleConfirm(selectedVillager);
                        setSelectedVillager(null);
                    }}
                    color="primary"
                >
                    Track
                </Button>
            </DialogActions>
        </Dialog>
    );
}
