import React, { useState, useEffect, useCallback } from 'react';
import { Activity } from '../../../interfaces/Board';
import { getBoardActivities } from '../../../services/board';

type Props = {
  boardID: string;
};

export const Activities: React.FC<Props> = ({ boardID }) => {
  const [activities, setActivities] = useState<Activity[] | null>(null);

  const loadActivities = useCallback(async () => {
    const data = await getBoardActivities(boardID);
    setActivities(data);
  }, [boardID]);

  useEffect(() => {
    if (activities === null) {
      loadActivities();
    }
  }, [activities]);

  return <div></div>;
};
