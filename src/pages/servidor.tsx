import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, LabelList } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { getServidores } from '../services/apiService';
import Head from 'next/head';

interface ChartData {
  label: string;
  servidores: number;
}

function ServidorPage() {
  const [dataByLotacao, setDataByLotacao] = useState<ChartData[]>([]);
  const [dataByAtividade, setDataByAtividade] = useState<ChartData[]>([]);
  const [totalServidores, setTotalServidores] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const fetchServidores = async () => {
      try {
        const { dataByLotacao, dataByAtividade, totalServidores } = await getServidores();
        setDataByLotacao(dataByLotacao);
        setDataByAtividade(dataByAtividade);
        setTotalServidores(totalServidores);
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

    fetchServidores();

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
    return null;
  }

  const chartConfig = {
    servidores: {
      label: "Servidores",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <div className='grid gap-4'>
      <Head>
        <title>JEAS - Servidores</title>
      </Head>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>
            Total de Servidores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-6xl font-bold">{totalServidores}</div>
          
          <CardDescription>Número total de servidores</CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Servidores por Lotação</CardTitle>
          <CardDescription>Distribuição de servidores por lotação</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="aspect-auto h-[320px] w-full">
            <BarChart
              accessibilityLayer
              data={dataByLotacao}
              margin={{ top: 30, left: 12, right: 12, bottom: isMobileDevice ? 120 : 85 }}
            >
              <CartesianGrid vertical={false} horizontal={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                interval={0}
                angle={isMobileDevice ? -90 : -45}
                textAnchor={isMobileDevice ? "end" : "end"}
              />
              <YAxis hide />
              <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="servidores" fill="var(--color-servidores)" radius={8}>
                <LabelList position="top" offset={8} className="fill-foreground" fontSize={12} />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Servidores por Atividade</CardTitle>
          <CardDescription>Distribuição de servidores por atividade</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="aspect-auto h-[450px] md:h-[350px] w-full">
            <BarChart
              accessibilityLayer
              data={dataByAtividade}
              margin={{ top: 30, left: 12, right: 12, bottom: isMobileDevice ? 185 : 130 }}
            >
              <CartesianGrid vertical={false} horizontal={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                interval={0}
                angle={isMobileDevice ? -90 : -45}
                textAnchor={isMobileDevice ? "end" : "end"}
              />
              <YAxis hide />
              <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="servidores" fill="var(--color-servidores)" radius={8}>
                <LabelList position="top" offset={8} className="fill-foreground" fontSize={12} />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default ServidorPage;
