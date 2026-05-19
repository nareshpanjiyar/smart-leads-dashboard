import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLeadById } from '../services/leadService';
import type { Lead } from '../types';
import LeadDetail from '../components/leads/LeadDetail';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { getErrorMessage } from '../utils/errorMessage';

const LeadDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const { data } = await getLeadById(id!);
        setLead(data);
      } catch (err: unknown) {
        setError(getErrorMessage(err, 'Failed to load lead'));
      } finally {
        setLoading(false);
      }
    };
    fetchLead();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!lead) return <ErrorMessage message="Lead not found" />;
  return <LeadDetail lead={lead} />;
};

export default LeadDetailPage;
