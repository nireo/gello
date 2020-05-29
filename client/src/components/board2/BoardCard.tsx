import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Item } from '../../interfaces/Item';

const CardContainer = styled.div`
  margin-bottom: 8px;
`;

type Props = {
  text: string;
  id: number;
  index: number;
  setItem: (item: Item) => void;
};

export const BoardCard: React.FC<Props> = ({ text, id, index, setItem }) => {
  const handleSetItem = () => {
    setItem({ content: text, uuid: text });
  };

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
              <div style={{ display: 'flex' }}>
                <Typography gutterBottom>{text}</Typography>
                <Button variant="contained" onClick={() => handleSetItem()}>
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        </CardContainer>
      )}
    </Draggable>
  );
};
