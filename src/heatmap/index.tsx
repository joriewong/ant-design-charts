import React, {  useEffect, useImperativeHandle, forwardRef } from 'react';
import { Heatmap as G2PlotHeatmap, HeatmapOptions as G2plotProps } from '@antv/g2plot';
import useChart, { ContainerProps } from '../hooks/useChart';
import { getChart } from '../util';
import { ChartRefOptions } from '../interface';
import { ErrorBoundary } from '../base';
import ChartLoading from '../util/createLoading';

export interface HeatmapConfig extends G2plotProps, ContainerProps {
  chartRef?: ChartRefOptions;
}

const HeatmapChart = forwardRef((props: HeatmapConfig, ref) => {
  const {
    chartRef,
    style,
    className,
    loading,
    loadingTemplate,
    errorTemplate,
    ...rest
  } = props;
  const { chart, container } = useChart<G2PlotHeatmap, HeatmapConfig>(G2PlotHeatmap, rest);
  useEffect(() => {
     getChart(chartRef, chart.current);
  }, [chart.current]);
  useImperativeHandle(ref, () => ({
    getChart: () => chart.current,
  }));
  return (
      <ErrorBoundary errorTemplate={errorTemplate}>
        {loading && <ChartLoading loadingTemplate={loadingTemplate} />}
        <div className={className} style={style} ref={container} />
      </ErrorBoundary>
  );
});

export default HeatmapChart;