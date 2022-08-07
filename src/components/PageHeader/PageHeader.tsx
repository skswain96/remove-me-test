import React from "react";
import Image from "next/image";

import {
  RadioGroup,
  Radio,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import { HeaderOptions } from "@/constants/header.constants";

import { useStyles } from "@/styles/components/pageHeader.style";

interface Props {
  title?: string;
  label?: string;
  radioOptions?: any;
  handleRadioChange?: any;
  filterType?: string;
}

const PageHeader: React.FC<Props> = ({
  title,
  label,
  radioOptions,
  handleRadioChange,
  filterType,
}) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <div>
      <Text size="xl" weight="bold" color="gray">
        {title}
      </Text>
      <Text size="xs" weight="normal" color={theme.colors.gray[6]}>
        {label}
      </Text>
      <div className={classes.radioWrapper}>
        <RadioGroup
          size="xs"
          color="grape"
          onChange={(value: string) => {
            handleRadioChange(value);
          }}
          value={filterType}
        >
          {radioOptions.length > 0 &&
            radioOptions.map((opt: any, index: number) => {
              return <Radio key={index} value={opt.value} label={opt.label} />;
            })}
        </RadioGroup>
      </div>
    </div>
  );
};

export default PageHeader;
