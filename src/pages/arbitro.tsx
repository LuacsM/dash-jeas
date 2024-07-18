import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, LabelList } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { getArbitros } from '../services/apiService';

interface ChartData {
  label: string;
  arbitros: number;
}

function ArbitroPage() {
  const [dataByModalidade, setDataByModalidade] = useState<ChartData[]>([]);
  const [totalArbitros, setTotalArbitros] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const fetchArbitros = async () => {
      try {
        const { dataByModalidade, totalArbitros } = await getArbitros();
        setDataByModalidade(dataByModalidade);
        setTotalArbitros(totalArbitros);
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

    fetchArbitros();

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
    arbitros: {
      label: "Árbitros",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <div className='grid gap-4'>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle >
            Total de Árbitros
          </CardTitle>
          {/* Você pode adicionar um ícone aqui se desejar */}
        </CardHeader>
        <CardContent>
          <div className="text-6xl font-bold">{totalArbitros}</div>
          
          <CardDescription>Número total de árbitros</CardDescription>
        </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle>Árbitros por Modalidade</CardTitle>
          <CardDescription>Distribuição de árbitros por modalidade</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="aspect-auto h-[350px] w-full">
            <BarChart
              accessibilityLayer
              data={dataByModalidade}
              margin={{ top: 30, left: 12, right: 12, bottom: isMobileDevice ? 75 : 75 }}
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
              <Bar dataKey="arbitros" fill="var(--color-arbitros)" radius={8}>
                <LabelList position="top" offset={8} className="fill-foreground" fontSize={12} />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default ArbitroPage;
