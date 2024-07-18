import axios from 'axios';

const API_BASE_URL_STUDENTS = 'https://dashboard-jeas-2024.vercel.app/estudantes';
const API_BASE_URL_SERVIDORES = 'https://dashboard-jeas-2024.vercel.app/servidores';
const API_BASE_URL_ARBITROS = 'https://dashboard-jeas-2024.vercel.app/arbitros';
const API_BASE_URL_EXTERNOS = 'https://dashboard-jeas-2024.vercel.app/servidores_externos';

interface StudentChartData {
  label: string;
  estudantes: number;
}

interface ServidorChartData {
  label: string;
  servidores: number;
}

interface ArbitroChartData {
  label: string;
  arbitros: number;
}

interface ExternoChartData {
  label: string;
  servidores_externos: number;
}

// Função para buscar dados dos estudantes
const fetchStudentsData = async (endpoint: string): Promise<StudentChartData[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL_STUDENTS}/${endpoint}`, {
      headers: {
        'accept': 'application/json',
      },
    });
    return response.data.map((item: any) => ({
      label: item.categoria_etaria || item.categoria_genero || item.rede_ensino || item.modalidade,
      estudantes: item.qtd_estudantes,
    }));
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

// Função para buscar o total de estudantes
const fetchStudentsTotal = async (): Promise<number> => {
  try {
    const response = await axios.get(`${API_BASE_URL_STUDENTS}/estudantes_total`, {
      headers: {
        'accept': 'application/json',
      },
    });
    return response.data[0].qtd_estudantes;
  } catch (error) {
    console.error(`Error fetching data from estudantes_total:`, error);
    throw error;
  }
};

// Função para buscar o total de estudantes PCD
const fetchStudentsTotalPCD = async (): Promise<number> => {
  try {
    const response = await axios.get(`${API_BASE_URL_STUDENTS}/estudantes_pcd`, {
      headers: {
        'accept': 'application/json',
      },
    });
    return response.data
      .filter((item: any) => item.pcd === "Sim")
      .reduce((acc: number, item: any) => acc + item.qtd_estudantes, 0);
  } catch (error) {
    console.error(`Error fetching data from estudantes_pcd_total:`, error);
    throw error;
  }
};

// Função para buscar dados dos servidores
const fetchServidoresData = async (endpoint: string): Promise<ServidorChartData[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL_SERVIDORES}/${endpoint}`, {
      headers: {
        'accept': 'application/json',
      },
    });
    return response.data.map((item: any) => ({
      label: item.lotacao || item.atividade,
      servidores: item.qtd_servidores,
    }));
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

// Função para buscar o total de servidores
const fetchServidoresTotal = async (): Promise<number> => {
  try {
    const response = await axios.get(`${API_BASE_URL_SERVIDORES}/servidores_total`, {
      headers: {
        'accept': 'application/json',
      },
    });
    return response.data[0].qtd_servidores;
  } catch (error) {
    console.error(`Error fetching data from servidores_total:`, error);
    throw error;
  }
};

// Função para buscar dados dos árbitros
const fetchArbitrosData = async (endpoint: string): Promise<ArbitroChartData[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL_ARBITROS}/${endpoint}`, {
      headers: {
        'accept': 'application/json',
      },
    });
    return response.data.map((item: any) => ({
      label: item.modalidade,
      arbitros: item.qtd_arbitros,
    }));
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

// Função para buscar o total de árbitros
const fetchArbitrosTotal = async (): Promise<number> => {
  try {
    const response = await axios.get(`${API_BASE_URL_ARBITROS}/arbitros_total`, {
      headers: {
        'accept': 'application/json',
      },
    });
    return response.data[0].qtd_arbitros;
  } catch (error) {
    console.error(`Error fetching data from arbitros_total:`, error);
    throw error;
  }
};

// Função para buscar dados dos servidores externos
const fetchExternosData = async (endpoint: string): Promise<ExternoChartData[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL_EXTERNOS}/${endpoint}`, {
      headers: {
        'accept': 'application/json',
      },
    });
    return response.data.map((item: any) => ({
      label: item.rede_ensino,
      servidores_externos: item.qtd_servidores_externos,
    }));
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

// Função para buscar o total de servidores externos
const fetchExternosTotal = async (): Promise<number> => {
  try {
    const response = await axios.get(`${API_BASE_URL_EXTERNOS}/servidores_externos_total`, {
      headers: {
        'accept': 'application/json',
      },
    });
    return response.data[0].qtd_servidores_externos;
  } catch (error) {
    console.error(`Error fetching data from servidores_externos_total:`, error);
    throw error;
  }
};

const processStudentChartData = (data: StudentChartData[]): StudentChartData[] => {
  return data.map(item => ({
    label: item.label,
    estudantes: item.estudantes,
  }));
};

const processServidorChartData = (data: ServidorChartData[]): ServidorChartData[] => {
  return data.map(item => ({
    label: item.label,
    servidores: item.servidores,
  }));
};

const processArbitroChartData = (data: ArbitroChartData[]): ArbitroChartData[] => {
  return data.map(item => ({
    label: item.label,
    arbitros: item.arbitros,
  }));
};

const processExternoChartData = (data: ExternoChartData[]): ExternoChartData[] => {
  return data.map(item => ({
    label: item.label,
    servidores_externos: item.servidores_externos,
  }));
};

interface StudentsData {
  dataByRede: StudentChartData[];
  dataByCategoriaEtaria: StudentChartData[];
  dataByCategoriaGenero: StudentChartData[];
  dataByModalidade: StudentChartData[];
  totalEstudantes: number;
  totalEstudantesPCD: number;
}

export const getStudents = async (): Promise<StudentsData> => {
  try {
    const [rede, modalidade, categoriaEtaria, genero, total, totalPCD] = await Promise.all([
      fetchStudentsData('estudantes_rede_ensino'),
      fetchStudentsData('estudantes_modalidade'),
      fetchStudentsData('estudantes_categoria_etaria'),
      fetchStudentsData('estudantes_categoria_genero'),
      fetchStudentsTotal(),
      fetchStudentsTotalPCD(),
    ]);

    return {
      dataByRede: processStudentChartData(rede),
      dataByModalidade: processStudentChartData(modalidade),
      dataByCategoriaEtaria: processStudentChartData(categoriaEtaria),
      dataByCategoriaGenero: processStudentChartData(genero),
      totalEstudantes: total,
      totalEstudantesPCD: totalPCD,
    };
  } catch (error) {
    console.error('Error fetching students data:', error);
    throw error;
  }
};

interface ServidoresData {
  dataByLotacao: ServidorChartData[];
  dataByAtividade: ServidorChartData[];
  totalServidores: number;
}

export const getServidores = async (): Promise<ServidoresData> => {
  try {
    const [lotacao, atividade, total] = await Promise.all([
      fetchServidoresData('servidores_lotacao'),
      fetchServidoresData('servidores_atividade'),
      fetchServidoresTotal(),
    ]);

    return {
      dataByLotacao: processServidorChartData(lotacao),
      dataByAtividade: processServidorChartData(atividade),
      totalServidores: total,
    };
  } catch (error) {
    console.error('Error fetching servidores data:', error);
    throw error;
  }
};

interface ArbitrosData {
  dataByModalidade: ArbitroChartData[];
  totalArbitros: number;
}

export const getArbitros = async (): Promise<ArbitrosData> => {
  try {
    const [modalidade, total] = await Promise.all([
      fetchArbitrosData('arbitros_modalidade'),
      fetchArbitrosTotal(),
    ]);
    return {
      dataByModalidade: processArbitroChartData(modalidade),
      totalArbitros: total,
    };
  } catch (error) {
    console.error('Error fetching arbitros data:', error);
    throw error;
  }
};

interface ExternosData {
  dataByRede: ExternoChartData[];
  totalExternos: number;
}

export const getExternos = async (): Promise<ExternosData> => {
  try {
    const [rede, total] = await Promise.all([
      fetchExternosData('servidores_externos_rede_ensino'),
      fetchExternosTotal(),
    ]);
    return {
      dataByRede: processExternoChartData(rede),
      totalExternos: total,
    };
  } catch (error) {
    console.error('Error fetching servidores externos data:', error);
    throw error;
  }
};
