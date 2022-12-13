import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { Divider, Grid } from "@mui/material";

type Props = {
  price: number;
};

export default function BasicPopover({ price }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="absolute top-1 right-1">
      <Button
        aria-describedby={id}
        onClick={handleClick}
        className="bg-primary text-black shadow-none"
      >
        Details {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="w-screen mx-4 p-4">
          <Grid container className="w-[90%] flex flex-row justify-between">
            <Grid>
              <Typography className=" text-l lg:text-xl font-bold text-black">
                Small Business
              </Typography>
              <Typography className=" text-md lg:text-l">
                Billed Monthly
              </Typography>
            </Grid>
            <Grid>
              <Typography className=" text-l lg:text-xl text-black">
                {price}.00
              </Typography>
            </Grid>
          </Grid>
          <br />
          <Grid container className="w-[90%] flex flex-row justify-between">
            <Grid>
              <Typography className=" text-l lg:text-xl font-bold text-black">
                Subtotal
              </Typography>
            </Grid>
            <Grid>
              <Typography className=" text-l lg:text-xl text-black">
                {price}.00
              </Typography>
            </Grid>
          </Grid>
          <Grid container className="w-[90%] flex flex-row justify-between">
            <Grid>
              <Typography className=" text-l lg:text-xl font-bold text-black">
                7 Day Trial
              </Typography>
            </Grid>
            <Grid>
              <Typography className=" text-l lg:text-xl text-red">
                ({price}.00)
              </Typography>
            </Grid>
          </Grid>
          <Divider className="w-[90%] my-3 border-b-5" />
          <Grid container className="w-[90%] flex flex-row justify-between">
            <Grid>
              <Typography className=" text-l lg:text-xl font-bold text-black">
                Total Today
              </Typography>
            </Grid>
            <Grid>
              <Typography className=" text-l lg:text-xl text-black">
                $0.00
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Popover>
    </div>
  );
}
