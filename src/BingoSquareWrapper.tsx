import { AspectRatio } from "@mui/joy";
import { BingoSquare } from "./BingoBoard";

import React, { PropsWithChildren } from "react";
import { SxProps } from "@mui/joy/styles/types";

interface Props {
  bingoSquareID: BingoSquare["id"];
  sx?: SxProps;
}

export function BingoSquareWrapper(
  props: PropsWithChildren<Props>,
): React.JSX.Element {
  const { bingoSquareID, sx, children } = props;
  return (
    <AspectRatio
      id={bingoSquareID}
      key={bingoSquareID}
      ratio={"1/1"}
      variant="outlined"
      sx={sx}
    >
      {children}
    </AspectRatio>
  );
}
