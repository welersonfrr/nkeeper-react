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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";

interface NoteProps {
  noteTitle: string;
  noteBody: string;
  color: string;
  colors: any;
  index: any;
  deleteFunc: any;
  editFunc: any;
  selectFunc: any;
}

const Note: React.FC<NoteProps> = ({
  noteTitle,
  noteBody,
  color,
  colors,
  index,
  deleteFunc,
  editFunc,
  selectFunc,
}) => {
  const loggedUser = JSON.parse(localStorage.getItem("logged")!);

  const [dataUser, setDataUser] = useState<any>(
    JSON.parse(localStorage.getItem(loggedUser.user)!)
  );

  const [noteColor, setNoteColor] = useState<string>(color);

  // Colors menu
  const [anchorElColor, setAnchorElColor] = React.useState<null | HTMLElement>(
    null
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElColor(event.currentTarget);
  };
  const handleCloseColor = () => {
    setAnchorElColor(null);
  };

  // Menu edit / delete
  const [anchorElOption, setAnchorElOptions] =
    React.useState<null | HTMLElement>(null);
  const handleClickOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElOptions(event.currentTarget);
    selectFunc();
  };
  const handleCloseOptions = () => {
    setAnchorElOptions(null);
  };

  const handleChangeColor = (color: string) => {
    handleCloseColor();
    dataUser.notes[index].color = color;
    localStorage.setItem(dataUser.user, JSON.stringify(dataUser));
    setDataUser(dataUser);
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
          <Tooltip title="Opções">
            <IconButton
              id="more-options"
              aria-controls={
                Boolean(anchorElOption) ? "more-options" : undefined
              }
              aria-haspopup="true"
              aria-expanded={Boolean(anchorElOption) ? "true" : undefined}
              onClick={handleClickOptions}
            >
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
          <Menu
            id="more-options"
            anchorEl={anchorElOption}
            keepMounted
            open={Boolean(anchorElOption)}
            onClose={handleCloseOptions}
            MenuListProps={{
              "aria-labelledby": "more-options",
            }}
          >
            <MenuItem>
              <Tooltip title="Editar">
                <IconButton onClick={editFunc}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </MenuItem>
            <MenuItem>
              <Tooltip title="Deletar">
                <IconButton onClick={deleteFunc}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </MenuItem>
          </Menu>
        </Box>
      </Paper>
    </React.Fragment>
  );
};

export default Note;
