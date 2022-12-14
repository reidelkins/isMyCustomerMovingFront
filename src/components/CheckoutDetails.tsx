import * as React from "react";

import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { Button, Divider, Popover, Stack } from "@mui/material";

type Props = {
  price: number;
  timeFrame: string | string[] | undefined;
};

export default function CheckoutDetails({ price, timeFrame }: Props) {
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
        className="bg-primary shadow-none"
      >
        <p className="text-sm text-black">
          Details {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </p>
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
        <div className="w-screen mx-4 p-8">
          <Stack
            direction={"row"}
            className="w-[90%]"
            spacing={2}
            justifyContent="space-between"
          >
            <Stack direction={"column"}>
              <p className=" text-l lg:text-xl font-bold text-black">
                Small Business
              </p>
              <p className=" text-md lg:text-l">
                Billed {timeFrame === "Month" ? "monthly" : "annually"}
              </p>
            </Stack>
            <p className=" text-l lg:text-xl text-black">{price}.00</p>
          </Stack>
          <br />
          <Stack
            direction={"row"}
            className="w-[90%]"
            spacing={2}
            justifyContent="space-between"
          >
            <p className=" text-l lg:text-xl font-bold text-black">Subtotal</p>
            <p className=" text-l lg:text-xl text-black">{price}.00</p>
          </Stack>
          <Stack
            direction={"row"}
            className="w-[90%]"
            spacing={2}
            justifyContent="space-between"
          >
            <p className=" text-l lg:text-xl font-bold text-black">
              7 Day Trial
            </p>
            <p className=" text-l lg:text-xl text-red">({price}.00)</p>
          </Stack>
          {/* <Grid container className="w-11/12 flex flex-row justify-between">
            <Grid>
              <p className=" text-l lg:text-xl font-bold text-black">
                Subtotal
              </p>
            </Grid>
            <Grid>
              <p className=" text-l lg:text-xl text-black">{price}.00</p>
            </Grid>
          </Grid> */}
          {/* <Grid container className="w-11/12 flex flex-row justify-between">
            <Grid>
              <p className=" text-l lg:text-xl font-bold text-black">
                7 Day Trial
              </p>
            </Grid>
            <Grid>
              <p className=" text-l lg:text-xl text-red">({price}.00)</p>
            </Grid>
          </Grid> */}
          <Divider className="w-[90%] my-3 border-b-5" />
          <Stack
            direction={"row"}
            className="w-[90%]"
            spacing={2}
            justifyContent="space-between"
          >
            <p className=" text-l lg:text-xl font-bold text-black">
              Total Today
            </p>

            <p className=" text-l lg:text-xl text-black">$0.00</p>
          </Stack>
        </div>
      </Popover>
    </div>
  );
}
