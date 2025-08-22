import { Link } from 'react-router-dom';
import { IconArrowRight, IconSparkles } from '@tabler/icons-react';

const SubjectCard = ({ subject, icon: Icon, color, description, href }) => {
  const colorClasses = {
    blue: {
      gradient: 'from-blue-500 to-cyan-500',
      hoverGradient: 'from-blue-600 to-cyan-600',
      shadowColor: 'shadow-blue-500/25',
      hoverShadowColor: 'hover:shadow-blue-500/40',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    teal: {
      gradient: 'from-teal-500 to-emerald-500',
      hoverGradient: 'from-teal-600 to-emerald-600',
      shadowColor: 'shadow-teal-500/25',
      hoverShadowColor: 'hover:shadow-teal-500/40',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600'
    },
    green: {
      gradient: 'from-green-500 to-lime-500',
      hoverGradient: 'from-green-600 to-lime-600',
      shadowColor: 'shadow-green-500/25',
      hoverShadowColor: 'hover:shadow-green-500/40',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    purple: {
      gradient: 'from-purple-500 to-pink-500',
      hoverGradient: 'from-purple-600 to-pink-600',
      shadowColor: 'shadow-purple-500/25',
      hoverShadowColor: 'hover:shadow-purple-500/40',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  };

  const colorClass = colorClasses[color] || colorClasses.blue;

  return (
    <Link to={href} className="group block h-full">
      <div className="relative h-full card group-hover:scale-105 transition-all duration-500 overflow-hidden">
        {/* Background Gradient Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colorClass.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
        
        {/* Glow Effect */}
        <div className={`absolute -inset-1 bg-gradient-to-r ${colorClass.gradient} rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-lg -z-10`}></div>

        {/* Header com Icon */}
        <div className="relative">
          <div className="flex items-start justify-between mb-6">
            <div className="relative">
              <div className={`w-16 h-16 ${colorClass.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                <Icon className={`w-8 h-8 ${colorClass.iconColor}`} />
              </div>
              
              {/* Sparkle Effect */}
              <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <IconSparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              </div>
            </div>

            {/* Arrow Indicator */}
            <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              <div className={`w-10 h-10 bg-gradient-to-r ${colorClass.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                <IconArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors duration-300 leading-tight">
              {subject}
            </h3>
            
            <p className="text-neutral-600 leading-relaxed text-base">
              {description}
            </p>

            {/* CTA */}
            <div className="flex items-center gap-2 text-primary-600 font-semibold group-hover:gap-3 transition-all duration-300">
              <span>Explorar conteúdo</span>
              <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-tr from-white/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </Link>
  );
};

export default SubjectCard;