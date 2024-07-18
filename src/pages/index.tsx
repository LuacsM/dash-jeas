"use client"

import { useEffect, useState } from 'react';
import { Pie, PieChart, Cell, Legend, Bar, BarChart, Tooltip, LabelList, YAxis, XAxis, CartesianGrid } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { getStudents } from '../services/apiService';

interface ChartData {
  label: string;
  estudantes: number;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFF", "#FF5692", "#82CA9D"];

function Home() {
  const [dataByRede, setDataByRede] = useState<ChartData[]>([]);
  const [dataByCategoriaEtaria, setDataByCategoriaEtaria] = useState<ChartData[]>([]);
  const [dataByCategoriaGenero, setDataByCategoriaGenero] = useState<ChartData[]>([]);
  const [dataByModalidade, setDataByModalidade] = useState<ChartData[]>([]);
  const [totalEstudantes, setTotalEstudantes] = useState<number | null>(null);
  const [totalEstudantesPCD, setTotalEstudantesPCD] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const fetchStudents = async () => {
      try {
        const { dataByRede, dataByCategoriaEtaria, dataByCategoriaGenero, dataByModalidade, totalEstudantes, totalEstudantesPCD } = await getStudents();
        setDataByRede(dataByRede);
        setDataByCategoriaEtaria(dataByCategoriaEtaria);
        setDataByCategoriaGenero(dataByCategoriaGenero);
        setDataByModalidade(dataByModalidade);
        setTotalEstudantes(totalEstudantes);
        setTotalEstudantesPCD(totalEstudantesPCD);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();

    const handleResize = () => {
      setIsMobileDevice(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!isClient) {
    return null; // Renderiza nada do lado do servidor
  }

  const chartConfig = {
    estudantes: {
      label: "Estudantes",
      color: "hsl(var(--chart-1))",
    },
  };

  const renderDonutChart = (data: ChartData[], title: string, description: string) => (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={data} dataKey="estudantes" nameKey="label" innerRadius={60} outerRadius={80}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );

  return (
    <div className='grid gap-4'>
      <div className="flex md:flex-row flex-col gap-4">
        <Card className='flex-1'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total de Estudantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold">{totalEstudantes}</div>
            <CardDescription>Número total de estudantes</CardDescription>
          </CardContent>
        </Card>

        <Card className='flex-1'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total de Estudantes PCD</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold">{totalEstudantesPCD}</div>
            <CardDescription>Número total de estudantes PCD</CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="flex md:flex-row flex-col gap-4">
        {renderDonutChart(dataByRede, "Estudantes por Rede de Ensino", "Distribuição de estudantes")}
        {renderDonutChart(dataByCategoriaEtaria, "Estudantes por Categoria Etária", "Distribuição de estudantes")}
        {renderDonutChart(dataByCategoriaGenero, "Estudantes por Categoria Gênero", "Distribuição de estudantes")}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Estudantes por Modalidade</CardTitle>
          <CardDescription>Distribuição de estudantes</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
            <BarChart
              accessibilityLayer
              data={dataByModalidade}
              margin={{ top: 30, left: 12, right: 12, bottom: isMobileDevice ? 75 : 12 }}
            >
              <CartesianGrid vertical={false} horizontal={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                interval={0}
                angle={isMobileDevice ? -90 : 0}
                textAnchor={isMobileDevice ? "end" : "middle"}
              />
              <YAxis hide />
              <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="estudantes" fill="var(--color-estudantes)" radius={8}>
                <LabelList position="top" offset={8} className="fill-foreground" fontSize={12} />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;
