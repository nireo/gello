import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const CardContainer = styled.div`
  margin-bottom: 8px;
`;

type Props = {
  text: string;
  id: number;
  index: number;
};

export const BoardCard: React.FC<Props> = ({ text, id, index }) => {
  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <CardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card>
            <CardContent>
              <Typography gutterBottom>{text}</Typography>
              <Button variant="contained">Edit</Button>
            </CardContent>
          </Card>
        </CardContainer>
      )}
    </Draggable>
  );
};
