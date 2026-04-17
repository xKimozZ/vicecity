import FeatureCard from "./FeatureCard";
import styles from "./FeaturesGrid.module.css";

const FeaturesGrid = ({ features }) => {
  return (
    <div className={styles.featuresGrid}>
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};

export default FeaturesGrid;