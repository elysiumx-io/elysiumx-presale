import { useEffect, useState } from "react";
import { getPresaleData } from "../firebase/presaleService";

const useCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const fetchEndDate = async () => {
      try {
        const data = await getPresaleData();
        const endDate = new Date(data.countdown.endDate).getTime();

        const updateCountdown = () => {
          const now = new Date().getTime();
          const distance = endDate - now;

          setTimeLeft({
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor(
              (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            ),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
          });
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
      } catch (error) {
        console.error("Failed to fetch countdown end date:", error);
      }
    };

    fetchEndDate();
  }, []);

  return timeLeft;
};

export default useCountdown;

