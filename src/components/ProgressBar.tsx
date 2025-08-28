import { useEffect, useState } from "react";
import type React from "react";
import { getPresaleData } from "../services/backendService";
import styles from "./ProgressBar.module.css";

interface Stage {
  name: string;
  target: number;
  raised: number;
}

interface ProgressBarProps {
  currentStage: number;
  setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStage,
  setCurrentStage,
}) => {
  const [stages, setStages] = useState<Stage[]>([]);
  const [soldAmount, setSoldAmount] = useState(0);

  useEffect(() => {
    const fetchProgressBarData = async () => {
      try {
        const data = await getPresaleData();
        setStages(data.progressBar.stages);
        setCurrentStage(data.progressBar.currentStage - 1);

        // Calculate total raised amount
        const totalRaised = data.progressBar.stages.reduce(
          (acc: number, stage: Stage) => acc + stage.raised,
          0
        );
        setSoldAmount(totalRaised);
      } catch (error) {
        console.error("Error fetching progress bar data:", error);
      }
    };

    fetchProgressBarData();
    const interval = setInterval(fetchProgressBarData, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [setCurrentStage]);

  if (stages.length === 0) {
    return <div>Loading...</div>;
  }

  const currentStageData = stages[currentStage];
  const progress = (soldAmount / currentStageData.target) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>{currentStageData.name} Progress</span>
        <span>
          {soldAmount.toLocaleString()} / {currentStageData.target.toLocaleString()} ELY
        </span>
      </div>
      <div className={styles.bar}>
        <div
          className={styles.progress}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className={styles.stageInfo}>
        {/* Assuming price is not part of the new data structure for now */}
      </div>
    </div>
  );
};

export default ProgressBar;

