import React, {  useEffect, useImperativeHandle, forwardRef } from 'react';
import { Bar as G2PlotBar, BarOptions as G2plotProps } from '@antv/g2plot';
import useChart, { ContainerProps } from '../hooks/useChart';
import { getChart } from '../util';
import { ChartRefOptions } from '../interface';
import { ErrorBoundary } from '../base';
import ChartLoading from '../util/createLoading';

export interface BarConfig extends G2plotProps, ContainerProps {
  chartRef?: ChartRefOptions;
}

const BarChart = forwardRef((props: BarConfig, ref) => {
  const {
    chartRef,
    style,
    className,
    loading,
    loadingTemplate,
    errorTemplate,
    ...rest
  } = props;
  const { chart, container } = useChart<G2PlotBar, BarConfig>(G2PlotBar, rest);
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

export default BarChart;