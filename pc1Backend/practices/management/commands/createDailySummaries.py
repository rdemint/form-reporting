from django.core.management.base import BaseCommand, CommandError
from practices.models import DailySummary, Practice, Entity, Provider, Specialty
from django.db.utils import IntegrityError
import csv
import os

'''
A command line utility to create DailySummaryobjects from CSV.
Example usage.... python manage.py carolina-health practice_summary_data.csv
Guards against empty csv file rows.
https://docs.djangoproject.com/en/2.2/howto/custom-management-commands/
'''

class Command(BaseCommand):
	LIMIT_ERRORS = True
	ERROR_LIMIT = 10

	help = "create DailySummary objects from csv file data.  The file must have column headers of Date, Visits, Workdays, Noshows"

	def add_arguments(self, parser):
		parser.add_argument('data_file', type=str)

	def setEntity(self, line):
		if line[4].strip() == "None" or line[4].strip() == "":
			return None
		else:
			return Entity.objects.get(slug=line[4].strip())

	def printError(self, e, linenum):
		print('{} on row {}'.format(e, linenum-1))

	def handle(self, *args, **options):
		file = options['data_file']
		total_created = 0
		total_skipped = 0
		skipped_lines = []

		with open(file, newline='',	encoding='utf-8-sig') as csvfile:
			reader = csv.reader(csvfile)

			for linenum, line in enumerate(reader):
				if linenum != 0:
					if line[0] != "":
						try:
							entity = self.setEntity(line)
							practice=Practice.objects.get(slug=line[5].strip())
							provider=practice.providers.get(first_name=line[6].strip(), last_name=line[7].strip())
							specialty=Specialty.objects.get(name=line[8].strip())

							DailySummary.objects.create(
								date=line[0], 
								visits=int(line[1]), 
								workdays=int(line[2]), 
								noshows=int(line[3]),
								entity=entity,
								practice=practice,
								provider=provider,
								specialty=specialty,
								)
			
						except Exception as e:
							if self.LIMIT_ERRORS == True and total_skipped <= self.ERROR_LIMIT:
								self.printError(e, linenum)
							elif self.LIMIT_ERRORS == False:
								self.printError(e, linenum)
							total_skipped += 1
							skipped_lines.append(line[0])
						else: 
							total_created+= 1
		print('{} File lines were skipped'.format(total_skipped))
		print('{} DailySummary objects were created'.format(total_created))