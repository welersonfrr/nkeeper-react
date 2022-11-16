import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import DeleteIcon from "@mui/icons-material/Delete";

// const colors = ["#fff", "#e91e63", "#4caf50", "#2196f3"];

interface NoteProps {
  noteTitle: string;
  noteBody: string;
  color: string;
  colors: any;
}

const Note: React.FC<NoteProps> = ({ noteTitle, noteBody, color, colors }) => {
  const [noteColor, setNoteColor] = useState<string>(color);

  const [anchorElColor, setAnchorElColor] = React.useState<null | HTMLElement>(
    null
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElColor(event.currentTarget);
  };
  const handleCloseColor = () => {
    setAnchorElColor(null);
  };

  const handleChangeColor = (color: string) => {
    handleCloseColor();
    setNoteColor(color);
  };

  return (
    <React.Fragment>
      <Paper
        elevation={3}
        sx={{
          padding: "1rem",
          borderRadius: "15px",
          backgroundColor: noteColor,
          margin: "0.5rem",
        }}
      >
        <Typography variant="h6">{noteTitle}</Typography>
        <Typography>{noteBody}</Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            // aria-label="colors"
            id="icon-button-colors"
            aria-controls={
              Boolean(anchorElColor) ? "basic-color-menu" : undefined
            }
            aria-haspopup="true"
            aria-expanded={Boolean(anchorElColor) ? "true" : undefined}
            onClick={handleClick}
          >
            <ColorLensIcon />
          </IconButton>
          <Tooltip title="Deletar">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Menu
            id="basic-color-menu"
            anchorEl={anchorElColor}
            keepMounted
            open={Boolean(anchorElColor)}
            onClose={handleCloseColor}
            MenuListProps={{
              "aria-labelledby": "icon-button-colors",
            }}
          >
            {colors.map((colors: string) => (
              <MenuItem
                key={colors}
                onClick={() => {
                  handleChangeColor(colors);
                }}
              >
                {/* <Typography textAlign="center">{colors}</Typography> */}
                <Box
                  sx={{
                    width: "1rem",
                    height: "1rem",
                    backgroundColor: colors,
                    border: "1px solid #ccc",
                  }}
                ></Box>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Paper>
    </React.Fragment>
  );
};

export default Note;
