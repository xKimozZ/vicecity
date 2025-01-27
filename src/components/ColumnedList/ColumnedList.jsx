import styles from "./ColumnedList.module.css";
import ColumnedItem from "./ColumnedItem";

const ColumnedList = ({ items }) => {
  return (
    <div className={styles.optionGrid}>
      {items.map((option) => (
        <ColumnedItem
          stringKey={option.stringKey}
          buttonNumber={option.buttonNumber}
          buttonGroup={option.buttonGroup}
          id={option.id}
          isTwoStaged={option.isTwoStaged}
          dependencies={option.dependencies}
          getStatusString={option.getStatusString}
          getOptionTextString={option.getOptionTextString}
          cursorFactors={option.cursorFactors}
        />
      ))}
    </div>
  );
};

export default ColumnedList;
