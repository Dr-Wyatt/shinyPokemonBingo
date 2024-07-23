import { AspectRatio } from "@mui/joy";
import { BingoBoardType, BingoSquare } from "./BingoBoard";

import React, { PropsWithChildren } from "react";

function getMinWidth(numberOfRows: number): number {
  switch (numberOfRows) {
    case 3:
      return 120;
    case 5:
      return 75;
    default:
      return 100;
  }
}

function getBackGroundColor(status: BingoSquare["status"]): string | undefined {
  switch (status) {
    case "found":
      return "lightGreen";
    case "hunting":
      return "orange";
    case "not_found":
      return undefined;
    default:
      return undefined;
  }
}

interface Props {
  bingoSquare: BingoSquare;
  bingoBoard: BingoBoardType;
}

export function BingoSquareWrapper(
  props: PropsWithChildren<Props>,
): React.JSX.Element {
  const { bingoSquare, bingoBoard, children } = props;
  return (
    <AspectRatio
      id={bingoSquare.id}
      key={bingoSquare.id}
      ratio={"1/1"}
      variant="outlined"
      sx={{
        minWidth: getMinWidth(bingoBoard.length),
        backgroundColor: getBackGroundColor(bingoSquare.status),
      }}
    >
      {children}
    </AspectRatio>
  );
}
