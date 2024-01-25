'use client';

import React, { useEffect, useRef, useState } from 'react';
import _, { get } from 'lodash';
import { COLOR_CHART } from '@/helpers/constants';
import { IconHexagon } from '@/assets/icons';
import DoughnutChart from '@/components/chart/Doughnut';
import { getDatasetAtEvent } from 'react-chartjs-2';
import { useDisclosure } from '@/hooks/useDisclosure';
import { Modal } from 'antd';
import { CoinAllocation } from '../../props';
import { round } from 'lodash';

interface IChartData {
  labels: string[];
  datasets: Dataset[];
}
interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string[];
  hoverOffset: number;
  borderWidth: number;
  hoverBorderColor: string;
}
const _returnRate = (a: number, b: number) => {
    let rate = round((a / b) * 100, 2);
    return rate;
  };

const ModalChart = ({ data, totalVolume }: { data: CoinAllocation[], totalVolume: number }) => {
  const chartRef = useRef();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [dataChart, setDataChart] = useState<IChartData>();
  const [dataModal, setDataModal] = useState<IChartData>();
  const [labelFocus, setLabelFocus] = useState({
    label: '',
    value: '',
  });

  const dataLabels = (i: number) => {
    let labelsDataChart;
    if (data.length > i) {
        labelsDataChart = [...data.slice(0,i).map((d) => d.coinName), 'Other'];
    } else {
        labelsDataChart = data.slice(0, data.length).map((d) => d.coinName);
    }
    return labelsDataChart;
  }

  const _returnData = (i: number) => {
    let _data;
    let otherRate;
    let _dataRate;
    
    if (data.length > i) {
        _data = (data.slice(0,i).map((d) => _returnRate(d.usdVolume, totalVolume)));
        otherRate = round(100 - _data.reduce((total, value) => total + value, 0), 2);
        _dataRate = [..._data, otherRate];
    } else {
        _dataRate = (data.slice(0,data.length).map((d) => _returnRate(d.usdVolume, totalVolume)));
    }
    return _dataRate;
  } 

  useEffect(() => {
    if (!data) return;
    const length = data.length;
    const colorChart = Object.keys(COLOR_CHART)
      .slice(0, length)
      .map((e: string) => COLOR_CHART[e as keyof typeof COLOR_CHART]);
    const dataChart = {
      labels: dataLabels(3),
      datasets: [
        {
          label: 'aaa',
          data: _returnData(3),
          backgroundColor: colorChart,
          hoverOffset: 20,
          borderWidth: 5,
          hoverBorderColor: 'white',
        },
      ],
    };
    const dataModal = {
        labels: dataLabels(9),
        datasets: [
          {
            label: 'aaa',
            data: _returnData(9),
            backgroundColor: colorChart,
            hoverOffset: 20,
            borderWidth: 5,
            hoverBorderColor: 'white',
          },
        ],
      };
    setDataChart(dataChart);
    setDataModal(dataModal);

    setLabelFocus({
      label: data[0]?.coinName,
      value:  _returnRate(data[0]?.usdVolume, totalVolume)+ '',
    });
  }, [data]);

  const onClickDoughnut = (event: any) => {
    const chart = chartRef.current as any;
    const activePoints = getDatasetAtEvent(chart, event);
    if (activePoints.length > 0) {
      onOpen();
    }
  };

  const _renderChart = () => {
    if (!dataChart) return <></>;
    return (
      <>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col flex items-center justify-center'>
          <div className='text-xl font-bold text-grey-700 max-w-[62px] lg:max-w-[124px] truncate'>
            {labelFocus.label}
          </div>
          <div className='text-base font-semibold text-grey-500'>
            {labelFocus.value}%
          </div>
        </div>
        <DoughnutChart
          data={dataChart}
          ref={chartRef}
          onClick={onClickDoughnut}
          options={{
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: false,
              },
            },
            cutout: 65,
            onHover: (e: any, activeElements: any, chart: any) => {
              console.log(e, activeElements, chart);
              if (activeElements[0]) {
                let ctx = activeElements[0].element.$context;
                let label = chart.data.labels[ctx.dataIndex];
                let value = chart.data.datasets[0].data[ctx.dataIndex];
                setLabelFocus({ label, value });
                console.log(label + ': ' + value);
              }
            },
          }}
        />
      </>
    );
  };

  const _renderLabels = () => {
    if (!dataChart) return null;
    const { datasets, labels } = dataChart;
    const dtSetFirstItem = datasets[0];
    return (
      <>
        {dtSetFirstItem.data.map((item, index) => (
          <li
            key={index}
            className='flex items-center gap-3'
            style={{
              color: dtSetFirstItem.backgroundColor[index],
            }}
          >
            <IconHexagon />
            <div className='text-sm font-medium text-grey-700 font-jm'>
              {labels[index]}: {item}%
            </div>
          </li>
        ))}
      </>
    );
  };

  const _renderModal = () => {
    if (!dataModal) return null;
    const { datasets, labels } = dataModal;
    const dtSetFirstItem = datasets[0];
    return (
      <>
        {dtSetFirstItem.data.map((item, index) => (
          <li
            key={index}
            className='flex items-center gap-3'
            style={{
              color: dtSetFirstItem.backgroundColor[index],
            }}
          >
            <IconHexagon />
            <div className='text-sm font-medium text-grey-700 font-jm'>
              {labels[index]}: {item}%
            </div>
          </li>
        ))}
      </>
    );
  };


  return (
    <div className='flex flex-1 flex-col gap-6'>
      <div className='text-base text-grey-700 font-bold text-center font-jm'>
        Token Allocation
      </div>
      <div className='flex flex-col md:flex-row'>
        <div className='w-[194px] h-[194px] relative'>{_renderChart()}</div>
        <div className='flex ml-5 items-center justify-center md:justify-start'>
            <ul className='gap-3 flex flex-col'>{_renderLabels()}</ul>
        </div>
      </div>

      <Modal
        title={<div className='text-xl'>Token Allocation</div>}
        open={isOpen}
        onOk={onClose}
        onCancel={onClose}
        footer={null}
      >
        <ul className='gap-3 flex flex-col mt-6'>
          {_renderModal()}
          {/* {Object.values(COLOR_CHART).map((item) => (
            <li
              className='flex items-center gap-3'
              style={{
                color: item,
              }}
            >
              <IconHexagon />
              <div className='text-sm font-medium text-grey-700'>
                Blockchain Services: {(Math.random() * 100).toFixed(2)}%
              </div>
            </li>
          ))} */}
        </ul>
      </Modal>
    </div>
  );
};

export default ModalChart;
