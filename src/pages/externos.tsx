import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, LabelList } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { getExternos } from '../services/apiService';
import Head from 'next/head';

interface ChartData {
  label: string;
  servidores_externos: number;
}

function ExternosPage() {
  const [dataByRede, setDataByRede] = useState<ChartData[]>([]);
  const [totalExternos, setTotalExternos] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const fetchExternos = async () => {
      try {
        const { dataByRede, totalExternos } = await getExternos();
        setDataByRede(dataByRede);
        setTotalExternos(totalExternos);
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

    fetchExternos();

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
    servidores_externos: {
      label: "Servidores Externos",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <div className='grid gap-4'>
        <Head>
        <title>JEAS - Integrantes Externos</title>
      </Head>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>
            Total de Servidores Externos
          </CardTitle>
          {/* Você pode adicionar um ícone aqui se desejar */}
        </CardHeader>
        <CardContent>
          <div className="text-6xl font-bold">{totalExternos}</div>
         
          <CardDescription>Número total de servidores externos</CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Servidores Externos por Rede de Ensino</CardTitle>
          <CardDescription>Distribuição de servidores externos por rede de ensino</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="aspect-auto h-[350px] w-full">
            <BarChart
              accessibilityLayer
              data={dataByRede}
              margin={{ top: 30, left: 12, right: 12}}
            >
              <CartesianGrid vertical={false} horizontal={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                interval={0}
              />
              <YAxis hide />
              <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="servidores_externos" fill="var(--color-servidores_externos)" radius={8}>
                <LabelList position="top" offset={8} className="fill-foreground" fontSize={12} />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default ExternosPage;
