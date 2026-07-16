import {
  Briefcase,
  Clapperboard,
  ClipboardList,
  Cloud,
  Code2,
  Compass,
  Frame,
  Globe,
  Image,
  Kanban,
  LifeBuoy,
  ListChecks,
  Mail,
  Megaphone,
  MessageSquare,
  Newspaper,
  Palette,
  PenTool,
  Repeat,
  SearchCheck,
  Smartphone,
  Star,
  Ticket,
  Users,
  Workflow,
  Check,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  ArrowLeft,
  Home,
  List,
  CirclePlus,
  Heart,
  User,
  MousePointer2,
  Server,
  Play,
  Zap,
  Clock,
  TrendingUp,
} from "lucide-react";

const ICONS = {
  Briefcase, Clapperboard, ClipboardList, Cloud, Code2, Compass, Frame, Globe,
  Image, Kanban, LifeBuoy, ListChecks, Mail, Megaphone, MessageSquare, Newspaper,
  Palette, PenTool, Repeat, SearchCheck, Smartphone, Star, Ticket, Users, Workflow,
  Check, ChevronDown, Menu, X, ArrowRight, ArrowLeft, Home, List, CirclePlus, Heart, User,
  MousePointer2, Server, Play, Zap, Clock, TrendingUp,
};

export default function Icon({ name, size = 20, strokeWidth = 2, ...props }) {
  const Cmp = ICONS[name];
  if (!Cmp) return null;
  return <Cmp size={size} strokeWidth={strokeWidth} {...props} />;
}
