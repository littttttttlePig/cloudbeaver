/*
 * cloudbeaver - Cloud Database Manager
 * Copyright (C) 2020 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { observer } from 'mobx-react';
import { useContext, useCallback } from 'react';
import styled, { css, use } from 'reshadow';

import { useStyles } from '@cloudbeaver/core-theming';

import { Icon } from '../Icons/Icon';
import { TableContext } from './TableContext';
import { TableItemContext } from './TableItemContext';

type Props = {
  onExpand?: (item: any, state: boolean) => void;
  className?: string;
  disabled?: boolean;
}

const styles = css`
  Icon {
    margin-left: 16px;
    width: 16px;
    height: 100%;
    padding: 0 16px;

    &[|expanded] {
      transform: rotate(180deg);
    }
  }
`;

export const TableItemExpand = observer(function TableItemExpand({
  onExpand,
  className,
  disabled,
}: Props) {
  const tableContext = useContext(TableContext);
  const context = useContext(TableItemContext);
  if (!context) {
    return null;
  }
  const handleClick = useCallback((event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    event.stopPropagation();

    if (disabled) {
      return;
    }

    const state = !context.isExpanded();

    tableContext?.setItemExpand(context.item, state);

    if (onExpand) {
      onExpand(context.item, state);
    }
  }, [tableContext, context, onExpand, disabled]);

  return styled(useStyles(styles))(
    <Icon name="angle" viewBox="0 0 15 8" {...use({ expanded: context.isExpanded() })} onClick={handleClick} className={className}/>
  );
});
