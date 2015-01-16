package ru.insoft.archive.qq.report;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.PostConstruct;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import ru.insoft.archive.core_model.table.desc.DescriptorValue;
import ru.insoft.archive.qq.entity.Execution;
import ru.insoft.archive.qq.entity.Question;

/**
 *
 * @author Благодатских С.
 */
@Stateless
public class StatQuery1 {

// Темы запросов
	public static final String social = "Q_VALUE_QUEST_TYPE_SOCIAL";
	public static final String tematic = "Q_VALUE_QUEST_TYPE_TEMATIC";
	public static final String genea = "Q_VALUE_QUEST_TYPE_GENEA";
	public static final String bio = "Q_VALUE_QUEST_TYPE_BIO";

	public static final String[] typesQuery = new String[]{
		social, tematic, genea, bio
	};

// Состояние запроса
	private static final String complited = "Q_VALUE_QSTAT_EXEC";

// Результаты ответов
	public static final String positive = "Q_VALUE_RESULT_PLUS";
	public static final String positivePaid = "Q_VALUE_RESULT_PLUS_PAID";
	public static final String negative = "Q_VALUE_RESULT_MINUS";
	public static final String negativePaid = "Q_VALUE_RESULT_MINUS_PAID";
	public static final String negativeNoProfil = "Q_VALUE_RESULT_MINUS_NEPROF";
	public static final String negativeWithView = "Q_VALUE_RESULT_MINUS_WVIEW";
	public static final String negativeWithRedirect = "Q_VALUE_RESULT_REDIRECT";
	public static final String negativeWithRecomendation = "Q_VALUE_RESULT_DOP_INFO";
	public static final String complyCanceled = "Q_VALUE_RESULT_REJECTED";

// Организации (Архивы)
	public static final String SIC = "Q_VALUE_MEMBER_SIC";
	public static final String GARF = "Q_VALUE_MEMBER_GARF";
	public static final String RGANTD = "Q_VALUE_MEMBER_RGANTD";
	public static final String RGAE = "Q_VALUE_MEMBER_RGAE";
	public static final String RGALI = "Q_VALUE_MEMBER_RGALI";
	public static final String RGASPI = "Q_VALUE_MEMBER_RGASPI";
	public static final String RGANI = "Q_VALUE_MEMBER_RGANI";
	public static final String RGBA = "Q_VALUE_MEMBER_RGBA";

// Фиктивное значение для колонки литера СИЦ
	public static final String SICLITERA = "siclitera";

// Соответсвие кодов архивов их описаниям
	public static final int archiveCount = 7;
	public static final String[] literaCodes = {
		GARF, "ГАРФ",
		RGAE, "РГАЭ",
		RGANTD, "РГАНТД",
		RGALI, "РГАЛИ",
		RGASPI, "РГАСПИ",
		RGANI, "РГАНИ",
		RGBA, "РГВА",
		"suball", "Подитог",
		SIC, "СИЦ",
		"all", "Итого",
		SICLITERA, "По литере"
	};

// Значения id для кодов изложенных выше
	private Map<String, Long> descriptorIds;
	private Map<Long, String> descriptorValues;

// контейнер для сбора информации
	public static class Stat {

		/**
		 * Получено
		 */
		public long recived;
		/**
		 * Исполнено всего
		 */
		public long executed;
		/**
		 * Исполнено выдано положительных ответов
		 */
		public long execPlus;
		/**
		 * Исполнено выдано отрицательных ответов
		 */
		public long execMinus;
		/**
		 * Исполнено выдано рекомендаций
		 */
		public long execRecomend;
		/**
		 * Мотивированный отказ
		 */
		public long refused;
		/**
		 * Снято с исполнения
		 */
		public long reseted;

		@Override
		public String toString() {
			return "Получено: " + recived + ", Исполнено( всего: "
					+ executed + ", полож: " + execPlus + ", отриц: " + execMinus
					+ ", реком: " + execRecomend + " ), мот. отказ: " + refused
					+ ", снято: " + reseted;
		}

	}

	@PersistenceContext(unitName = "SicEntityManager")
	private EntityManager em;

	@PostConstruct
	private void initIdsData() {
		descriptorIds = new HashMap<>();
		descriptorValues = new HashMap<>();
		List<DescriptorValue> descs = em.createQuery("SELECT d from DescriptorValue d WHERE d.code IN :values")
				.setParameter("values", Arrays.asList(social, tematic, genea, bio,
								complited, complyCanceled,
								positive, positivePaid, negative, negativeNoProfil, negativePaid,
								negativeWithRecomendation, negativeWithRedirect, negativeWithView,
								SIC, GARF, RGAE, RGALI, RGANI, RGANTD, RGASPI, RGBA))
				.getResultList();
		for (DescriptorValue d : descs) {
			String value = d.getCode();
			Long id = d.getId();
			descriptorIds.put(value, id);
			descriptorValues.put(id, value);
		}
	}

	public Map<String, List<Stat>> collect(Date start, Date end) {
		Query query = em.createQuery("SELECT q FROM Question q "
				+ "WHERE q.regDate BETWEEN :start AND :end")
				.setParameter("start", start)
				.setParameter("end", end);

		Map<String, List<Stat>> archives = new HashMap<String, List<Stat>>() {
			{
				put(SIC, Arrays.asList(new Stat(), new Stat(), new Stat(), new Stat()));
				put(GARF, Arrays.asList(new Stat(), new Stat(), new Stat(), new Stat()));
				put(RGANTD, Arrays.asList(new Stat(), new Stat(), new Stat(), new Stat()));
				put(RGAE, Arrays.asList(new Stat(), new Stat(), new Stat(), new Stat()));
				put(RGALI, Arrays.asList(new Stat(), new Stat(), new Stat(), new Stat()));
				put(RGASPI, Arrays.asList(new Stat(), new Stat(), new Stat(), new Stat()));
				put(RGANI, Arrays.asList(new Stat(), new Stat(), new Stat(), new Stat()));
				put(RGBA, Arrays.asList(new Stat(), new Stat(), new Stat(), new Stat()));
				put(SICLITERA, Arrays.asList(new Stat(), new Stat(), new Stat(), new Stat()));
			}
		};

		List<Question> results = query.getResultList();
		for (Question question : results) {
			Long answerTypeId = null;
			Execution execution = question.getExecution();
			if (execution != null) {
				answerTypeId = execution.getAnswerResult();
			}
			Long typeId = question.getQuestionType();

			if (typeId.equals(descriptorIds.get(social))) {
				countArchives(archives, 0, answerTypeId, question);
			} else if (typeId.equals(descriptorIds.get(tematic))) {
				countArchives(archives, 1, answerTypeId, question);
			} else if (typeId.equals(descriptorIds.get(genea))) {
				countArchives(archives, 2, answerTypeId, question);
			} else {
				countArchives(archives, 3, answerTypeId, question);
			}
		}
		return archives;

	}

	/**
	 * Выполняется подсчет запросов определенных видов
	 *
	 * @param archives контейнеры для хранения данных по архивам
	 * @param index номер контейнера 0 - social, 1 - tematic, 2 - genea, 3 - bio
	 * @param answerTypeId идентификатор типа ответа (положительный,
	 * отрицательный и т.д.)
	 * @param question запрос
	 */
	private void countArchives(Map<String, List<Stat>> archives, int index, Long answerTypeId, Question question) {
		List<Stat> stats = new ArrayList<>();
		stats.add(archives.get(descriptorValues.get(question.getExecOrg())).get(index));

		Long litera = question.getLitera();
		if (litera.equals(descriptorIds.get(SIC))) {
			stats.add(archives.get(SICLITERA).get(index));
		}

		for (Stat stat : stats) {
			++stat.recived;
			String answerType = descriptorValues.get(answerTypeId);
			if (question.getStatus().equals(descriptorIds.get(complited))) {
				++stat.executed;
				if (answerType != null) {
					switch (answerType) {
						case positive:
						case positivePaid:
							++stat.execPlus;
							break;
						case negative:
						case negativeNoProfil:
						case negativePaid:
						case negativeWithView:
						case negativeWithRedirect:
							++stat.execMinus;
							break;
						case negativeWithRecomendation:
							++stat.execRecomend;
					}
				}
				if (question.getMotivatedRefusal().equals(1)) {
					++stat.refused;
				}
			}

			if (answerType != null && answerType.equals(complyCanceled)) {
				++stat.reseted;
			}
		}

	}
}
