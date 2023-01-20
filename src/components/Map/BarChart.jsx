import * as React from "react";
import { ResponsiveBar } from "@nivo/bar";

const BarChart = () => {
  return (
    // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
    <div style={{ width: "500px", height: "30px", margin: "0 auto" }}>
      <ResponsiveBar
        //chart에 사용될 데이터
        data={[{ Review: "평점", communication: 4.5 }]}
        //chart에 보여질 데이터 key (측정되는 값)
        keys={["communication"]}
        //keys들을 그룹화하는 index key (분류하는 값)
        indexBy="Review"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.5}
        //커스텀할때 색상
        colors="#819608"
        borderRadius={15}
        layout="horizontal"
        axisBottom={null}
        axisTop={null}
        axisRight={null}
        axisLeft={null}
        enableGridY={false}
        enableLabel={false}
        labelSkipWidth={13}
        labelSkipHeight={12}
        labelTextColor={{ theme: "background" }}
        legends={[]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function (e) {
          return (
            e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          );
        }}
      />
    </div>
  );
};

export default BarChart;
